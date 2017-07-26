//
//  RNSnackBarView.h
//  SnackBarTest
//
//  Created by Remi Santos on 13/04/16.
//  Copyright © 2016 Remi Santos. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RNSnackBarView : UIView

+ (void)showWithOptions:(NSDictionary*)options andCallback:(void(^)())callback;
+ (void)dismiss;

@end
