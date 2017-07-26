#!/bin/bash
#
# Saved as its own file so that Travis uses the correct shell to run it.

mkdir node_modules/react-native-snackbar
cp -R ../{package.json,android,ios,lib} node_modules/react-native-snackbar/
