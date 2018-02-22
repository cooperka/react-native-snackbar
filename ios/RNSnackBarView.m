//
//  RNSnackBarView.m
//  RNSnackBarTest
//
//  Created by Remi Santos on 13/04/16.
//  Copyright © 2016 Remi Santos. All rights reserved.
//

#import "RNSnackBarView.h"
#import <React/RCTConvert.h>

typedef NS_ENUM(NSInteger, RNSnackBarViewState) {
  RNSnackBarViewStateDisplayed,
  RNSnackBarViewStatePresenting,
  RNSnackBarViewStateDismissing,
  RNSnackBarViewStateDismissed
};

static NSDictionary* DEFAULT_DURATIONS;
static const NSTimeInterval ANIMATION_DURATION = 0.250;

@interface RNSnackBarView ()
{
    UILabel* titleLabel;
    UIButton* actionButton;
    NSTimer* dismissTimer;
}
@property (nonatomic, strong) NSDictionary* pendingOptions;

@property (nonatomic) RNSnackBarViewState state;
@property (nonatomic, strong) NSString* title;
@property (nonatomic, strong) NSString* actionTitle;
@property (nonatomic, strong) UIColor* actionTitleColor;
@property (nonatomic, strong) void (^pendingCallback)();
@property (nonatomic, strong) void (^callback)();

@end

@implementation RNSnackBarView

+ (void)initialize {
    DEFAULT_DURATIONS = @{
                          @"-2": @INT_MAX,
                          @"-1": @1500,
                           @"0": @2750
                         };
}

+ (id)sharedSnackBar {
    static RNSnackBarView *sharedSnackBar = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
      sharedSnackBar = [[self alloc] init];
    });
    return sharedSnackBar;
}

+ (void)showWithOptions:(NSDictionary *)options andCallback:(void (^)())callback {
    RNSnackBarView *snackBar = [RNSnackBarView sharedSnackBar];
    snackBar.pendingOptions = options;
    snackBar.pendingCallback = callback;
    [snackBar show];
}

+ (void)dismiss {
    RNSnackBarView *snackBar = [RNSnackBarView sharedSnackBar];
    [snackBar dismiss];
}

- (instancetype)init
{
    self = [super initWithFrame:CGRectMake(0, [UIScreen mainScreen].bounds.size.height - 48, [UIScreen mainScreen].bounds.size.width, 48)];
    if (self) {
        [self buildView];
    }
    return self;
}

- (void)buildView {
    CGFloat topPadding = 14;
    CGFloat bottomPadding = topPadding;

    if (@available(iOS 11.0, *)) {
        UIWindow *window = UIApplication.sharedApplication.keyWindow;

        if (window.safeAreaInsets.bottom > bottomPadding)
            bottomPadding = window.safeAreaInsets.bottom;
    }

    self.backgroundColor = [UIColor colorWithRed:0.196078F green:0.196078F blue:0.196078F alpha:1.0F];
    self.accessibilityIdentifier = @"snackbar";
  
    titleLabel = [UILabel new];
    titleLabel.text = _title;
    titleLabel.numberOfLines = 2;
    titleLabel.textColor = [UIColor whiteColor];
    titleLabel.font = [UIFont boldSystemFontOfSize:14];
    [titleLabel setTranslatesAutoresizingMaskIntoConstraints:NO];
    [self addSubview:titleLabel];

    actionButton = [UIButton new];
    actionButton.titleLabel.font = [UIFont boldSystemFontOfSize:16];
    [actionButton setTitle:@"" forState:UIControlStateNormal];
    [actionButton addTarget:self action:@selector(actionPressed:) forControlEvents:UIControlEventTouchUpInside];
    [actionButton setTranslatesAutoresizingMaskIntoConstraints:NO];
    [self addSubview:actionButton];

    [self addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:
          @"H:|-24-[titleLabel]-24-[actionButton]-24-|"
          options:0 metrics:nil views:@{@"titleLabel": titleLabel, @"actionButton": actionButton}]];
    [self addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:[NSString stringWithFormat:@"V:|-%f-[titleLabel]-%f-|", topPadding, bottomPadding] options:0 metrics:nil views:@{@"titleLabel": titleLabel}]];
    [self addConstraint:[NSLayoutConstraint constraintWithItem:actionButton attribute:NSLayoutAttributeCenterY relatedBy:NSLayoutRelationEqual toItem:titleLabel attribute:NSLayoutAttributeCenterY multiplier:1 constant:0]];
    [titleLabel setContentCompressionResistancePriority:250 forAxis:UILayoutConstraintAxisHorizontal];
    [titleLabel setContentHuggingPriority:250 forAxis:UILayoutConstraintAxisHorizontal];
    [actionButton setContentCompressionResistancePriority:750 forAxis:UILayoutConstraintAxisHorizontal];
    [actionButton setContentHuggingPriority:750 forAxis:UILayoutConstraintAxisHorizontal];

}

-(void)setTitle:(NSString *)title {
    titleLabel.text = title;
}

-(void)setActionTitle:(NSString *)actionTitle {
    [actionButton setTitle:actionTitle forState:UIControlStateNormal];
}

-(void)setActionTitleColor:(UIColor *)actionTitleColor {
    [actionButton setTitleColor:actionTitleColor forState:UIControlStateNormal];
}

- (void)actionPressed:(UIButton*)sender {
    [self dismiss];
    self.callback();
}

- (void)presentWithDuration:(NSNumber*)duration {
    _pendingOptions = nil;
    _pendingCallback = nil;
    UIWindow* keyWindow = [UIApplication sharedApplication].keyWindow;
    [keyWindow addSubview:self];
    [self setTranslatesAutoresizingMaskIntoConstraints:false];
    [keyWindow addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"V:[self(>=48)]|" options:0 metrics:nil views:@{@"self": self}]];
    [keyWindow addConstraints:[NSLayoutConstraint constraintsWithVisualFormat:@"H:|[self]|" options:0 metrics:nil views:@{@"self": self}]];

    self.transform = CGAffineTransformMakeTranslation(0, self.bounds.size.height);
    titleLabel.alpha = 0;
    actionButton.alpha = 0;
    self.state = RNSnackBarViewStatePresenting;
    [UIView animateWithDuration:ANIMATION_DURATION animations:^{
        self.transform = CGAffineTransformIdentity;
        titleLabel.alpha = 1;
        actionButton.alpha = 1;
     } completion:^(BOOL finished) {
        self.state = RNSnackBarViewStateDisplayed;
        NSTimeInterval interval;
        if ([duration doubleValue] <= 0) {
            NSString* durationString = [duration stringValue];
            interval = [(NSNumber*)DEFAULT_DURATIONS[durationString] floatValue] / 1000;
        } else {
            interval = [duration doubleValue] / 1000;
        }
        dismissTimer = [NSTimer scheduledTimerWithTimeInterval:interval
                                                        target:self
                                                      selector:@selector(dismiss)
                                                      userInfo:nil
                                                       repeats:FALSE];
     }];
}

- (void)dismiss {
    [self.layer removeAllAnimations];
    [dismissTimer invalidate];
    self.state = RNSnackBarViewStateDismissing;
    [UIView animateWithDuration:ANIMATION_DURATION animations:^{
        self.transform = CGAffineTransformMakeTranslation(0, self.bounds.size.height);
    } completion:^(BOOL finished) {
        self.state = RNSnackBarViewStateDismissed;
        [self removeFromSuperview];
        if (_pendingOptions) {
            [self show];
        }
    }];
}

- (void)show {
    if (self.state == RNSnackBarViewStateDisplayed || self.state == RNSnackBarViewStatePresenting) {
      [self dismiss];
      return;
    }
    if (self.state == RNSnackBarViewStateDismissing) {
      return;
    }
    if (!_pendingOptions) { return; }

    id backgroundColor = _pendingOptions[@"backgroundColor"];

    self.backgroundColor = backgroundColor ? [RCTConvert UIColor:backgroundColor] : [UIColor colorWithRed:0.196078F green:0.196078F blue:0.196078F alpha:1.0F];
    self.title = _pendingOptions[@"title"];
    self.callback = _pendingCallback;
    NSDictionary* action = _pendingOptions[@"action"];
    if (action) {
        self.actionTitle = _pendingOptions[@"action"][@"title"];
        NSNumber* color = _pendingOptions[@"action"][@"color"];
        self.actionTitleColor = [RCTConvert UIColor:color];
    } else {
        self.actionTitle = @"";
    }
    NSNumber* duration = _pendingOptions[@"duration"] ? (NSNumber*)_pendingOptions[@"duration"] : @(-1);
    [self presentWithDuration:duration];
}

@end
