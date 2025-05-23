import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const carType = defineType({
  name: "car",
  title: "Car",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    // Remove manual Id, use _id from Sanity
    defineField({ name: "Car_name", type: "string", title: "Car Name" }),
    defineField({ name: "Car_price", type: "string", title: "Car Price" }),
    defineField({ name: "Reg_yr", type: "string", title: "Registration Year" }),
    defineField({ name: "KMS", type: "string", title: "KMS Driven" }),
    defineField({ name: "Fuel_type", type: "string", title: "Fuel Type" }),
    defineField({
      name: "Reg_state",
      type: "string",
      title: "Registration State",
    }),
    defineField({ name: "Car_type", type: "string", title: "Car Type" }),
    defineField({ name: "Engine", type: "string", title: "Engine" }),
    defineField({
      name: "Transmission",
      type: "string",
      title: "Transmission",
    }),
    defineField({ name: "OwnerShip", type: "string", title: "Ownership" }),
    defineField({ name: "Peak_torque", type: "string", title: "Peak Torque" }),
    defineField({ name: "Peak_power", type: "string", title: "Peak Power" }),
    defineField({ name: "Doors", type: "string", title: "Doors" }),
    defineField({ name: "DriveSys", type: "string", title: "Drive System" }),
    defineField({
      name: "SeatingCapacity",
      type: "string",
      title: "Seating Capacity",
    }),
    defineField({
      name: "Mfg_yr",
      type: "string",
      title: "Manufacturing Year",
    }),
    defineField({ name: "Color", type: "string", title: "Color" }),
    defineField({
      name: "IMG_front",
      type: "image",
      title: "Front Image",
      options: { hotspot: true },
    }),
    defineField({
      name: "Img_arr",
      title: "Image Array",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      validation: (Rule) => Rule.max(8),
    }),
    defineField({
      name: "FormLink",
      type: "url",
      title: "Form Link",
      description: "Optional",
      validation: (Rule) => Rule.uri({ allowRelative: false }),
    }),
    defineField({
      name: "treading_position",
      type: "number",
      title: "Trending Position",
      description: "1 to 10, overwrite if already exists",
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: "hashtags",
      type: "string",
      title: "Hashtags",
      description:
        "Add hashtags separated by commas, e.g. #luxury,#sedan,#automatic",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "Car_name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "brand",
      type: "string",
      title: "Brand",
      options: {
        list: [
          { title: "Audi", value: "Audi" },
          { title: "BMW", value: "BMW" },
          { title: "Bentley", value: "Bentley" },
          { title: "Ferrari", value: "Ferrari" },
          { title: "Jaguar", value: "Jaguar" },
          { title: "Lamborghini", value: "Lamborghini" },
          { title: "Land Rover", value: "Land Rover" },
          { title: "Mercedes-Benz", value: "Mercedes-Benz" },
          { title: "Porsche", value: "Porsche" },
          { title: "Rolls-Royce", value: "Rolls-Royce" },
          { title: "Tesla", value: "Tesla" },
          { title: "Toyota", value: "Toyota" },
          { title: "Volkswagen", value: "Volkswagen" },
          { title: "Volvo", value: "Volvo" },
          { title: "Mini", value: "Mini" },
          { title: "Lexus", value: "Lexus" },
          { title: "Nissan", value: "Nissan" },
          { title: "Hyundai", value: "Hyundai" },
          { title: "Ford", value: "Ford" },
          { title: "Jeep", value: "Jeep" },
          { title: "Skoda", value: "Skoda" },
          { title: "MG", value: "MG" },
          { title: "KIA", value: "KIA" },
          { title: "Mahindra", value: "Mahindra" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "style",
      type: "string",
      title: "Style",
      options: {
        list: [
          { title: "SUV", value: "SUV" },
          { title: "Sedan", value: "Sedan" },
          { title: "Convertible", value: "Convertible" },
          { title: "Coupe", value: "Coupe" },
          { title: "Sports", value: "Sports" },
          { title: "MUV-MPV", value: "MUV-MPV" },
          { title: "Hatchback", value: "Hatchback" },
        ],
        layout: "dropdown",
      },
    }),
  ],
  preview: {
    select: {
      title: "Car_name",
      media: "IMG_front",
      subtitle: "Car_price",
      brand: "brand",
      style: "style",
    },
    prepare(selection) {
      const { title, subtitle, brand, style, media } = selection;
      return {
        title: title,
        subtitle: [brand, style, subtitle].filter(Boolean).join(" | "),
        media,
      };
    },
  },
});

// Add this export for the type
export type CarType = {
  _id: string;
  Car_name: string;
  Car_price: string;
  Car_price_num?: number;
  year?: string;
  Reg_yr?: string;
  KMS?: string;
  Fuel_type?: string;
  fuel_type?: string;
  transmission?: string;
  Reg_state?: string;
  Car_type?: string;
  Engine?: string;
  Transmission?: string;
  OwnerShip?: string;
  Peak_torque?: string;
  Peak_power?: string;
  Doors?: string;
  DriveSys?: string;
  SeatingCapacity?: string;
  Mfg_yr?: string;
  Color?: string;
  IMG_front?: {
    asset?: {
      _ref: string;
      url?: string;
    };
  };
  Img_arr?: Array<{
    asset?: {
      _ref: string;
      url?: string;
    };
  }>;
  FormLink?: string;
  treading_position?: number;
  hashtags?: string;
  slug?: { current: string };
  brand?: string;
  style?: string;
};
