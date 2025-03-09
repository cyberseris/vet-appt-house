/**
 * An avatar component that displays either an image or a fallback with initials.
 * Default: 100px circle avatar with capital A and background color.
 *
 * @param {string} [className=""] - Additional CSS classes for the wrapper.
 * @param {Object} [info={ name: "Anonymous" }] - User info object.
 * @param {string} [info.name="Anonymous"] - User's name for generating initials.
 * @param {string} [info.avatar] - URL of the user's avatar image.
 * @param {number} [size=100] - Diameter of the avatar in pixels.
 * @param {Object} [style] - Custom styles applied to the avatar.
 * @param {React.ReactNode} [children] - Additional elements inside the avatar container.
 */

const Avatar = ({
  className = "",
  info = { name: "Anonymous" },
  size = 100,
  style,
  children,
}) => {
  const name = info.name || "Anonymous";
  const initials = name.charAt(0).toUpperCase();
  const lastChar = name.slice(-1).toLowerCase() || "a";

  const backgroundColor = `hsl(${
    (lastChar.charCodeAt(0) % 26) * 14
  }, 70%, 60%)`;
  const styleObj = {
    width: size,
    height: size,
    fontWeight: "500",
    borderRadius: "50%",
    ...style,
  };
  const noneImageAvatar = (
    <div
      className="avatar"
      style={{
        ...styleObj,
        backgroundColor,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        fontSize: size * 0.6,
        justifyContent: "center",
        textTransform: "uppercase",
      }}
    >
      {initials}
    </div>
  );

  return (
    <div
      className={`avatar-wrapper ${className}`}
      style={{
        minWidth: size,
        minHeight: size,
        display: "flex",
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: style?.borderRadius || "50%",
      }}
    >
      {info.avatar ? (
        <>
          <img
            className="avatar"
            src={info.avatar}
            alt="avatar image"
            style={{
              objectFit: "cover",
              objectPosition: "center",
              ...styleObj,
            }}
            onError={(e) => e.target.classList.add("d-none")}
            onLoad={(e) => e.target.classList.remove("d-none")}
          />
          <div className="img-alt">{noneImageAvatar}</div>
        </>
      ) : (
        noneImageAvatar
      )}
      {children}
    </div>
  );
};

export default Avatar;
