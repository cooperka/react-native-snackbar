//
//  Created by Remi Santos on 13/04/16.
//  Copyrights by Facebook, Remi Santos, and Kevin Cooper.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNSnackbar : RCTEventEmitter <RCTBridgeModule>

- (void)sendSnackbarVisibilityEvent:(NSNumber *)event;
- (NSDictionary *)constantsToExport;

@end
