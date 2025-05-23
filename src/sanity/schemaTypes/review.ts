import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Review",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    // Remove manual Id, use _id from Sanity
    defineField({ name: "Car_name", type: "string", title: "Car Name" }),
    defineField({
      name: "Sold_date",
      type: "date",
      title: "Sold Date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
      description: "Pick the sold date using the calendar picker.",
    }),
    defineField({ name: "Review", type: "text", title: "Review" }),
    defineField({
      name: "Name_of_clients",
      type: "string",
      title: "Name of Clients",
    }),
    defineField({
      name: "Img",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "Car_name",
      subtitle: "Name_of_clients",
      media: "Img",
    },
  },
});
