function userToPublicJson(user) {
  if (!user) return null;
  const o = user.toObject ? user.toObject() : { ...user };
  delete o.password;
  if (o.profilePicture && Buffer.isBuffer(o.profilePicture)) {
    o.profilePicture = o.profilePicture.toString('base64');
  }
  o.id = o._id?.toString?.() ?? o.id;
  delete o._id;
  return o;
}

module.exports = { userToPublicJson };
