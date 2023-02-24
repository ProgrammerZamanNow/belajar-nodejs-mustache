import Mustache from "mustache"

test("Menggunakan Mustache", () => {
    const data = Mustache.render("Hello {{name}}", {name: "Eko"});
    // Hello Eko
    expect(data).toBe("Hello Eko");
});


test("Menggunakan Mustache Cache", () => {
    Mustache.parse("Hello {{name}}");

    const data = Mustache.render("Hello {{name}}", {name: "Eko"});
    // Hello Eko
    expect(data).toBe("Hello Eko");
});


test("Tags", () => {
    const data = Mustache.render("Hello {{name}}, my hobby is {{{hobby}}}", {
        name: "Eko",
        hobby: "<b>Programming</b>"
    });
    // Hello Eko
    expect(data).toBe("Hello Eko, my hobby is <b>Programming</b>");
});
