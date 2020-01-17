//
//  Created by Remi Santos on 13/04/16.
//  Copyrights by Facebook, Remi Santos, and Kevin Cooper.
//

#import "RNSnackBarView.h"
#import "RNSnackbar.h"

@implementation RNSnackbar

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(show : (NSDictionary *)options callback : (RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
      [RNSnackBarView showWithOptions:options
                          andCallback:^{
                            callback(@[ [NSNull null], [NSNull null] ]);
                          }];
    });
}

RCT_EXPORT_METHOD(dismiss) {
    dispatch_async(dispatch_get_main_queue(), ^{
      [RNSnackBarView dismiss];
    });
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (NSDictionary *)constantsToExport {
    return @{
        @"LENGTH_SHORT" : @-1,
        @"LENGTH_LONG" : @-2,
        @"LENGTH_INDEFINITE" : @0,
    };
}

@end
