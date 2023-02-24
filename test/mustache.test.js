import Mustache from "mustache"
import fs from "fs/promises"

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

test("Nested Object", () => {
    const data = Mustache.render("Hello {{person.name}}", {
        person: {
            name: "Eko"
        }
    });
    // Hello Eko
    expect(data).toBe("Hello Eko");
});

test("Mustache File", async () => {
    const helloTemplate = await fs.readFile("./templates/hello.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        title: "Programmer Zaman Now"
    });
    console.info(data);
    expect(data).toContain("Programmer Zaman Now");
});
