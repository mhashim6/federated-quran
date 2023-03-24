import { extractToken } from "../utils.js";

const dummyRequests = {
  headers: {
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im02aGFzaGltQGdtYWlsLmNvbSIsImlhdCI6MTY3OTY0MjM5Mn0.K8kexYV3vPFW-14go2xNFvhc9RWvMJ2wvXaML6UMLM8",
  },
};

test("extracts jwt token successfully", () => {
  expect(extractToken(dummyRequests)).toEqual(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im02aGFzaGltQGdtYWlsLmNvbSIsImlhdCI6MTY3OTY0MjM5Mn0.K8kexYV3vPFW-14go2xNFvhc9RWvMJ2wvXaML6UMLM8"
  );
});
