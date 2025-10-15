export interface OtpData {
  secret: string;
  issuer: string;
  label: string;
}

export function parseOtpUri(uri: string): OtpData | null {
  try {
    const url = new URL(uri);

    //now we have to make sure it is a valid otpauth uri
    if (url.protocol !== "otpauth:") {
      console.error("invalid url protocol");
      return null;
    }
    //now we extract the secret
    const secret = url.searchParams.get("secret");
    if (!secret) {
      console.error("secret not found in url");
      return null;
    }

    //now we extract the label the text after the secret :
    const label = decodeURIComponent(url.pathname.substring(1));

    //now we extract the issuer which might be a search parameter or can be part of the label
    const issuer =
      url.searchParams.get("issuer") || label.split(":")[0] || "Unknown";
    return { secret, issuer, label };
  } catch (error) {
    console.error("failed to parse url", error);
    return null;
  }
}
