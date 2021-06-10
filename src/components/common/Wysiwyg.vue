<template>
  <tiptap-vuetify
    style="width: 100%"
    :value="value"
    @input="$emit('input', $event)"
    :extensions="extensions"
  />
</template>

<script>
import {
  TiptapVuetify,
  History,
  Blockquote,
  BulletList,
  Italic,
  Link,
  ListItem,
  Strike,
  Underline,
  OrderedList,
  Heading,
  Bold,
  Code,
  HorizontalRule,
  Paragraph,
  HardBreak,
} from "tiptap-vuetify";

export default {
  name: "Wysiwyg",
  props: {
    value: String,
  },
  components: { TiptapVuetify },
  data() {
    return {
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },
};
</script>
