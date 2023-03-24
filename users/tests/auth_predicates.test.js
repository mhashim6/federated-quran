import { permit } from "../auth_predicates.js";

test("permit runs action on a truthy predicate", async () => {
  expect(
    await permit({
      predicate: () => true,
      action: () => "success",
      defValue: { error: "failure" },
    })
  ).toEqual("success");
});

test("permit returns defValue on a falsy predicate", async () => {
  expect(
    await permit({
      predicate: () => false,
      action: () => "success",
      defValue: "failure",
    })
  ).toEqual("failure");
});
