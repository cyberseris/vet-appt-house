const icons = import.meta.glob("@/assets/icons/*.svg", { eager: true });
const iconQuery = Object.fromEntries(
  Object.entries(icons).map(([path, module]) => {
    const fileName = path.split("/").pop().replace(".svg", "");
    return [fileName, module.default];
  })
);
const DEFAULT_ICON = iconQuery["footprint"] || "";
/**
 * Default: 24px footprint icon
 *
 * @param {string} [className=""] - Additional CSS classes.
 * @param {string} [fileName] - Name of the SVG file (from @/assets/icons).
 * @param {string} [src] - Custom URL for the icon (overrides fileName).
 * @param {string|number} [size] - Sets both width and height in shorthand way.
 * @param {string|number} [width] - Sets width (overrides size if provided).
 * @param {string|number} [height] - Sets height (overrides size if provided).
 */

const Icon = ({ className, fileName, src, size, width, height }) => {
  const iconSrc = src || iconQuery[fileName] || DEFAULT_ICON;
  return (
    <i
      className={`icon ${className || ""}`}
      style={{
        width: size || width || 24,
        height: size || height || 24,
        maskImage: `url("${iconSrc}")`,
        WebkitMaskImage: `url("${iconSrc}")`,
      }}
    />
  );
};

export default Icon;
