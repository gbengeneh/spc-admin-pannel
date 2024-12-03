'use server';

import slugify from 'slugify';
import {CategoriesWithProductsResponse } from "@/app/admin/categories/categories.types";
import { createCategorySchema, createCategorySchemaServer } from "@/app/admin/categories/create-category.schema";
import { createClient } from "@/supabase/server";

const supabase = createClient();

export const getCategoriesWithProducts = 
async(): Promise<CategoriesWithProductsResponse> =>{
    const {data, error} = await supabase
    .from('category')
    .select("* , products:product(*)")
    .returns<CategoriesWithProductsResponse>();

    if (error) {
        throw new Error(`Error fetching categories: ${error.message}`);
      }
      
    return data || [];
} 

export const imageUploadHandler = async (formData: FormData) => {
  if(!formData) return;

  const fileEntry = formData.get('file');

  if(!(fileEntry instanceof File)) throw new Error('Expected a file');

  const fileName = fileEntry.name;

  try {
    const {data , error} = await supabase.storage.from('app-images').upload(fileName, fileEntry, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Error uploading image:', error);
      throw new Error('Error uploading image');
    }

    const {data:{publicUrl}} = await supabase.storage.from('app-images').getPublicUrl(data.path);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image', error);
    throw new Error('Error uploading image')
  }
};

export const createCategory  = async ({
  imageUrl,
  name
}: createCategorySchemaServer) =>{
  const slug = slugify(name, {lower: true});

  const {data, error} = await supabase.from('category').insert({
    name,
    imageUrl,
    slug,
  });

  if(error) throw new Error(`Error creating category: ${error.message}`);

  return data;
};



