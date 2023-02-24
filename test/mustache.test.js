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

test("Mustache Sections Not Show", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {});
    console.info(data);
    expect(data).not.toContain("Hello Person");
});

test("Mustache Sections Show", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        person: {
            name: "Eko"
        }
    });
    console.info(data);
    expect(data).toContain("Hello Person");
});


test("Sections Data", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        person: {
            name: "Eko"
        }
    });
    console.info(data);
    expect(data).toContain("Hello Person Eko!");
});

test("Inverted Sections", async () => {
    const helloTemplate = await fs.readFile("./templates/person.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {});
    console.info(data);
    expect(data).toContain("Hello Guest");
});

test("List", async () => {
    const helloTemplate = await fs.readFile("./templates/hobbies.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        hobbies: ["Coding", "Gaming", "Reading"]
    });
    console.info(data);
    expect(data).toContain("Coding");
    expect(data).toContain("Gaming");
    expect(data).toContain("Reading");
});

test("List Object", async () => {
    const helloTemplate = await fs.readFile("./templates/students.mustache")
        .then(data => data.toString());

    const data = Mustache.render(helloTemplate, {
        students: [
            {name: "Eko", value: 100},
            {name: "Budi", value: 95}
        ]
    });
    console.info(data);
    expect(data).toContain("Eko");
    expect(data).toContain("Budi");
    expect(data).toContain("100");
    expect(data).toContain("95");
});

test("Functions", async () => {
    const parameter = {
        name: "Eko",
        upper: () => {
            return (text, render) => {
                return render(text).toUpperCase();
            }
        }
    }

    const data = Mustache.render("Hello {{#upper}}{{name}}{{/upper}}", parameter);
    console.info(data);
    expect(data).toBe("Hello EKO");
});
