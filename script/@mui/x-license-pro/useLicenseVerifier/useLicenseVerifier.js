import * as React from 'react';
import { verifyLicense } from '../verifyLicense/verifyLicense';
import { LicenseInfo } from '../utils/licenseInfo';
import { showExpiredLicenseError, showInvalidLicenseError, showNotFoundLicenseError } from '../utils/licenseErrorMessageUtils';
import { LicenseStatus } from '../utils/licenseStatus';
export function useLicenseVerifier() {
  return React.useMemo(() => {
    // var newLicenseStatus = verifyLicense(LicenseInfo.getReleaseInfo(), LicenseInfo.getKey());

    // if (newLicenseStatus === LicenseStatus.Invalid) {
    //   showInvalidLicenseError();
    // } else if (newLicenseStatus === LicenseStatus.NotFound) {
    //   showNotFoundLicenseError();
    // } else if (newLicenseStatus === LicenseStatus.Expired) {
    //   showExpiredLicenseError();
    // }

    return LicenseStatus.Valid;
  }, []);
}
