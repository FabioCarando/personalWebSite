import Link from "next/link";

const links = [
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Journal",
    href: "/journal",
  },
  {
    label: "CV",
    href: "/cv",
  },
  {
    label: "Now",
    href: "/now",
  },
  {
    label: "Music",
    href: "/music",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  return (
    <header className="relative z-50 bg-[#f1f0eb]">
      <nav
        className="
          page-shell
          flex
          h-20
          items-center
          justify-between
          border-b
          border-black/20
        "
      >
        <Link
          href="/"
          className="
            text-[13px]
            font-semibold
            tracking-[-0.03em]
            transition-opacity
            hover:opacity-50
          "
        >
          FABIO CARANDO
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link, index) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-baseline gap-1.5"
            >
              <span className="font-mono text-[8px] text-black/30">
                0{index + 1}
              </span>

              <span
                className="
                  text-[11px]
                  transition-opacity
                  group-hover:opacity-40
                "
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <button
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-wider
            md:hidden
          "
          type="button"
        >
          Menu
        </button>
      </nav>
    </header>
  );
}