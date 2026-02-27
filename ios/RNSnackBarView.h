//
//  Created by Remi Santos on 13/04/16.
//  Copyrights by Facebook, Remi Santos, and Kevin Cooper.
//

#import <UIKit/UIKit.h>
#import "RNSnackbar.h"

@interface SnackBarOptions : NSObject
@property NSString *text;
@property NSInteger duration;
@property NSInteger numberOfLines;
@property BOOL textAlignCenter;
@property NSInteger marginBottom;
@property NSInteger textColor;
@property NSInteger backgroundColor;
@property NSString *fontFamily;
@property BOOL rtl;
@property BOOL action;
@property NSString *actionText;
@property NSInteger actionTextColor;
@end

@interface RNSnackBarView : UIView

+ (void)showWithOptions:(SnackBarOptions *)options andCallback:(void (^)())callback rnSnackbar:(RNSnackbar *)rnSnackbar;
+ (void)dismiss;

@end
