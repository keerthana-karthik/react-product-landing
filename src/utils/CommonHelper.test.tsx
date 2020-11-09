import { formatResponseArray } from "./CommonHelper";

it("Test formatResponseArray with empty param", () => {
  expect(formatResponseArray({})).toEqual([]);
});

it("Test formatResponseArray with valid param", () => {
  let res: any = {
    data: {
      id: "1",
      name: "All",
      groups: [
        {
          id: "946",
          name: "Doctors",
          price: { regular: 24, selling: 24 },
          hero: { href: "imgjpg", height: 363 },
          images: { href: "2jpg" },
        },
      ],
    },
  };
  expect(formatResponseArray(res)).toHaveLength(1);
});
