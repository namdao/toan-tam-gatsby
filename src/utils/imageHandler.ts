import appConstant from "constant/appConstant";

export const uploadImageToAws = async (url: string, file: File) => {
  try {
    const myHeaders = new Headers();
    if (file.name.includes("png")) {
      myHeaders.append("Content-Type", "image/png");
    } else {
      myHeaders.append("Content-Type", "image/jpeg");
    }
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: file,
      redirect: "follow" as RequestRedirect,
    };

    const result = await fetch(url, requestOptions);
    if (result.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getImageToAws = (urlName: string) => {
  return `${appConstant.URL_IMG}${urlName}`;
};
