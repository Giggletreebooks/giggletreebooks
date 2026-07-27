# Book covers

One folder per series, one image per book.

```
covers/
  series-1-farm-animals/
    Henrietta the Chicken.jpg
    Penelope the Pig.jpg
  series-2-wild-animals/
    Ella the Elephant.jpg
```

**Folder name** — `series-<n>-<slug>`, lowercase, hyphens, no spaces. Must match
the `coverDir` set for that series in `app/lib/series-seed.ts`.

**File name** — exactly the book title as written in `app/lib/books.ts`, capitals
and spaces included. `Ducky the duck.jpg` will not match `Ducky the Duck`.

After adding images, run `./scripts/prepare-covers.sh` from the repository root
to convert them to web-sized JPEGs. Full-size originals are several megabytes
each and get served to visitors untouched.

A missing or misnamed file is not fatal — the card shows a placeholder panel and
the build prints which file it expected.

Full instructions: see the README at the repository root.
