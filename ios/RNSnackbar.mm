//
//  Created by Remi Santos on 13/04/16.
//  Copyrights by Facebook, Remi Santos, and Kevin Cooper.
//

#import "RNSnackBarView.h"
#import "RNSnackbar.h"

@implementation RNSnackbar

- (void)show:(nonnull NSString *)text duration:(NSInteger)duration numberOfLines:(NSInteger)numberOfLines textAlignCenter:(BOOL)textAlignCenter marginBottom:(NSInteger)marginBottom textColor:(NSInteger)textColor backgroundColor:(NSInteger)backgroundColor fontFamily:(nonnull NSString *)fontFamily rtl:(BOOL)rtl action:(BOOL)action actionText:(nonnull NSString *)actionText actionTextColor:(NSInteger)actionTextColor onPress:(nonnull RCTResponseSenderBlock)onPress {
    SnackBarOptions *options = [[SnackBarOptions alloc] init];
    options.text = text;
    options.duration = duration;
    options.numberOfLines = numberOfLines;
    options.textAlignCenter = textAlignCenter;
    options.marginBottom = marginBottom;
    options.textColor = textColor;
    options.backgroundColor = backgroundColor;
    options.fontFamily = fontFamily;
    options.rtl = rtl;
    options.action = action;
    options.actionText = actionText;
    options.actionTextColor = actionTextColor;
    dispatch_async(dispatch_get_main_queue(), ^{
        [RNSnackBarView showWithOptions:options
                            andCallback:^{
                                onPress(NULL);
                            } rnSnackbar:self];
    });
}

- (void)dismiss {
    dispatch_async(dispatch_get_main_queue(), ^{
        [RNSnackBarView dismiss];
    });
}

- (void)sendSnackbarVisibilityEvent:(NSNumber *)event {
    [self emitOnSnackbarVisibility:@{@"event": event}];
}

- (nonnull facebook::react::ModuleConstants<JS::NativeSnackbar::Constants::Builder>)constantsToExport {
    return [self getConstants];
}

- (nonnull facebook::react::ModuleConstants<JS::NativeSnackbar::Constants::Builder>)getConstants {
    return facebook::react::typedConstants<JS::NativeSnackbar::Constants::Builder>({
        .LENGTH_SHORT = -1,
        .LENGTH_LONG = 0,
        .LENGTH_INDEFINITE = -2,
        .DISMISS_EVENT_SWIPE = 0,
        .DISMISS_EVENT_ACTION = 1,
        .DISMISS_EVENT_TIMEOUT = 2,
        .DISMISS_EVENT_MANUAL = 3,
        .DISMISS_EVENT_CONSECUTIVE = 4,
        .SHOW_EVENT = 5,
    });
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSnackbarSpecJSI>(params);
}

+ (NSString *)moduleName
{
    return @"RNSnackbar";
}

@end
