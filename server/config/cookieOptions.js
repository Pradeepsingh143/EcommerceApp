const cookieOptions = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // sameSite: 'None',
    // secure: true
  };

export default cookieOptions