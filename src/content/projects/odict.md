---
title: "ODict"
path: "/projects/odict"
sub: "2017 –"
icon: "odict"
duration: "July 2017 – Present"
website: "https://github.com/odict/odict"
status: "Active"
stack: "C++, FlatBuffers, Snappy, Lucy"
---

### Overview

The Open Dictionary Project (ODict) is a tiny dictionary file format written in C++ and powered by a number of Google technologies (for now). Users write dictionaries in a flavor of XML called ODict XML (ODXML), then pass the XML to the `odict` CLI tool, which generates a compiled binary dictionary file. The user can then use the CLI or one of the ODict SDK libraries to retrieve dictionary definitions from the file.

While the aim of ODict has always been high-performance, I personally feel more can be done to improve in this area. The definition retrieval time increases with dictionary size, despite using map and index algorithms using O(log _n_) time complexity. More resources need to put into improving performance, but unfortunate I nor other Linguistic / ODict team members have had the time recently.

### Motivation

While a number of dictionary file formats already exist, we at Linguistic had a problem with _all of them_. The most popular format, Apple Dictionary, is closed-source. Documentation exists on how to create dictionaries, but none exists on how to read them. Other formats, such as StarDict, are open-source but have scarce documentation and fragmented SDK libraries. We actually found through reverse-engineering a few Android dictionary apps that most apps use their own, custom format that no one but the app can read.

We wanted to build the first dictionary format that was completely open, documented and open-sourced from the ground-up. We wanted all of its support libraries to exist under a single community and make it easy for anyone to use it. ODict also happens to be the first dictionary format that doesn't just return HTML for all of its dictionary entries. Each entry is broken down into its hierarchical components: etymologies, word usages, definition groups, and definitions. ODict returns the definition as a JSON hierarchy, and it is up to the developer to style it appropriately.

### Usage

Let us take a brief example of an ODXML file:

```xml
<dictionary name="Example Dictionary">
  <entry term="run">
    <ety description="Latin root">
      <usage pos="verb">
        <group description="A number of verb usages">
          <definition>(vertebrates) To move swiftly.</definition>
          <definition>(fluids) To flow.</definition>
          <definition>(nautical, of a vessel) To sail before the wind, in distinction from reaching or sailing close-hauled.</definition>
        </group>
        <definition>(social) To carry out an activity.</definition>
        <definition>To extend or persist, statically or dynamically, through space or time.</definition>
        <definition>(transitive) To execute or carry out a plan, procedure or program.</definition>
      </usage>
    </ety>
  </entry>
</dictionary>
```

To compile the markup to binary:

```bash
$ ./odict generate ./example.xml
```

To read an entry from the compiled dictionary:

```bash
$ ./odict lookup "run" ./example.odict
```

### Design

ODict is built on top of [Flatbuffers](https://google.github.io/flatbuffers/), Google's cross-platform serialization library, which allows us to serialize hierarchical dictionary data to binary and write it to file. Flatbuffers was chosen over [ProtoBuf](https://developers.google.com/protocol-buffers/) due to its ability to retrieve data entries from a serialized blob without deserializing it first.

When an ODXML file is compiled, the XML is first traversed with [RapidXML](http://rapidxml.sourceforge.net/) and then compiled to a FlatBuffers data object. The Flatbuffers data is then run through [Snappy](https://github.com/google/snappy), Google's compression library, to prepare the data to be written to disk.

Lastly, the file content is prepared and written. The final bytes appear in the following order:

| Name         | Type          | Size     | Description                                                                                                 |
| ------------ | ------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| Signature    | `CHAR[6]`     | 6        | Signature for the ODict format. Assertions fail if this signature is missing. Should always be `ODICT`.     |
| Version      | `USHORT`      | 2        | Represents the major version of ODict with which the file was created.                                      |
| Content-Size | `ULONG`       | 4 or 8   | Size (in bytes) of the compressed content to read. Used in assertions to validate file length.              |
| Content      | `CONST CHAR*` | Variable | Snappy compressed FlatBuffer object. Must be decompressed and converted to `uint8_t` before it can be used. |

When a dictionary entry is retrieved, the data is first calculated and decompressed using the `Content-Size` value, then retrieved via binary search (by key), resulting in a $O(\text{log }n)$ time complexity. If a fuzzy search is performed, ODict utilizes [Apache Lucene](http://lucene.apache.org/) to index and search the dictionary. These searches perform similarly to the binary-search method.
