//
//  Created by Remi Santos on 13/04/16.
//  Copyrights by Facebook, Remi Santos, and Kevin Cooper.
//

#import "RNSnackBarView.h"
#import "RNSnackbar.h"

@implementation RNSnackbar {
    bool hasListeners;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(show : (NSDictionary *)options callback : (RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [RNSnackBarView showWithOptions:options
                          andCallback:^{
                            callback(@[ [NSNull null], [NSNull null] ]);
                          } rnSnackbar:self];
    });
}

RCT_EXPORT_METHOD(dismiss) {
    dispatch_async(dispatch_get_main_queue(), ^{
      [RNSnackBarView dismiss];
    });
}

// Will be called when this module's first listener is added.
-(void)startObserving {
    hasListeners = YES;
    // Set up any upstream listeners or background tasks as necessary
}

// Will be called when this module's last listener is removed, or on dealloc.
-(void)stopObserving {
    hasListeners = NO;
    // Remove upstream listeners, stop unnecessary background tasks
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"onSnackbarVisibility"];
}

- (void)sendSnackbarVisibilityEvent:(NSNumber *)event {
    // Only send events if anyone is listening
    if (hasListeners) {
        [self sendEventWithName:@"onSnackbarVisibility" body:@{@"event": event}];
    }
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (NSDictionary *)constantsToExport {
    return @{
        @"LENGTH_SHORT" : @-1,
        @"LENGTH_LONG" : @0,
        @"LENGTH_INDEFINITE" : @-2,
        @"DISMISS_EVENT_SWIPE" : @0,
        @"DISMISS_EVENT_ACTION" : @1,
        @"DISMISS_EVENT_TIMEOUT" : @2,
        @"DISMISS_EVENT_MANUAL" : @3,
        @"DISMISS_EVENT_CONSECUTIVE" : @4,
        @"SHOW_EVENT" : @5,
    };
}

@end
