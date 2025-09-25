import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import { ICategory } from "./as_category.interface";
import { Category } from "./as_category.model";
import unlinkFile from "../../../shared/unlinkFile";

const createCategoryToDB = async (data:ICategory)=>{
    data.questions = JSON.parse(data.questions as any as string)
    const result = await Category.create(data);
    return result;
}

const getAllCategoryFromDB = async ()=>{
    const result = await Category.find({status:{$ne:"deleted"}});
    return result;
}

const updateCategoryToDB = async (id:string,data:ICategory)=>{
    const isExist = await Category.findById(id);
    if(!isExist){
        throw new ApiError(StatusCodes.NOT_FOUND,'Category not found');
    }
    if(data.icon){
        unlinkFile(isExist.icon)
    }
    if(data.questions){
        data.questions = JSON.parse(data.questions as any as string)
    }
    const result = await Category.findByIdAndUpdate(id,data,{new:true});
    return result;
}

const getSingleCategoryFromDB = async (id:string)=>{
    const result = await Category.findById(id);
    return result;
}

const deleteCategoryFromDB = async (id:string)=>{
    const result = await Category.findByIdAndUpdate(id,{status:"deleted"},{new:true});
    unlinkFile(result!.icon)
    return result;
}

export const AsCategoryService = {
    createCategoryToDB,
    getAllCategoryFromDB,
    updateCategoryToDB,
    getSingleCategoryFromDB,
    deleteCategoryFromDB
}
