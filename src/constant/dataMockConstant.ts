const dataMockConstant = {
  cover: () =>
    `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_${Math.floor(
      Math.random() * 24
    )}.jpg`,
  avatar: () =>
    `https://api-dev-minimal-v4.vercel.app/assets/images/avatars/avatar_${Math.floor(
      Math.random() * 24
    )}.jpg`,
};
export default dataMockConstant;
