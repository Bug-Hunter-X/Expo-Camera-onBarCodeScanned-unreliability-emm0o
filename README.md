# Expo Camera onBarCodeScanned unreliability

This repository demonstrates an issue with Expo's Camera component where the `onBarCodeScanned` callback is unreliable.  The barcode scanner may miss scans, especially under conditions of rapid scanning or concurrent events. The solution provided attempts to address this by using a debounce technique to prevent rapid-fire calls from overwhelming the system.  This ensures better accuracy in barcode detection.

## Problem
The default `onBarCodeScanned` behavior often results in missed barcodes, causing failures in barcode processing within your application.

## Solution
The provided solution uses a debounce function to manage the `onBarCodeScanned` calls.  This prevents multiple calls from being triggered in rapid succession, thus increasing reliability. 
