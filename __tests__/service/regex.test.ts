import { regexCode, verify } from "../../service/RegexService"

describe("Test regex service", () => {
  it("should email be truthy", () => {
    expect(verify("abc123@gmail.com", regexCode["EMAIL"])).toBeTruthy();
  })

  it("should email be falsy", () => {
    expect(verify("abc123", regexCode["EMAIL"])).toBeFalsy();
  })

  it("should password be truthy", () => {
    expect(verify("abcd-1234", regexCode["PWD"])).toBeTruthy();
  })

  it("should password be falsy", () => {
    expect(verify("wrong", regexCode["PWD"])).toBeFalsy();
  })
})