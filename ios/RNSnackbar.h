//
//  Created by Remi Santos on 13/04/16.
//  Copyrights by Facebook, Remi Santos, and Kevin Cooper.
//

#import <SnackbarSpec/SnackbarSpec.h>

@interface RNSnackbar : NativeSnackbarSpecBase <NativeSnackbarSpec>

- (void)sendSnackbarVisibilityEvent:(NSNumber *)event;

@end
