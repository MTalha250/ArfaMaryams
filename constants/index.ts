export const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Premium",
        href: "/categories/premium",
      },
      {
        label: "Formals",
        href: "/categories/formals",
      },
      {
        label: "Semi-Formals",
        href: "/categories/semi-formals",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "About",
    href: "/about",
  },
];
