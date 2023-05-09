//
//  Created by Remi Santos on 13/04/16.
//  Copyrights by Facebook, Remi Santos, and Kevin Cooper.
//

#import <UIKit/UIKit.h>
#import "RNSnackbar.h"

@interface RNSnackBarView : UIView

+ (void)showWithOptions:(NSDictionary *)options andCallback:(void (^)())callback rnSnackbar:(RNSnackbar *)rnSnackbar;
+ (void)dismiss;

@end
