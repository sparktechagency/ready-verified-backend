import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiError";
import QueryBuilder from "../../builder/QueryBuilder";
import { ITemplate } from "./template.interface";
import { Template } from "./template.model";
import unlinkFile from "../../../shared/unlinkFile";

const createTemplateIntoDB = async (data: ITemplate) => {
    const result = await Template.create(data);
    return result;
};

const getAllTemplateFromDB = async (query:Record<string,any>) => {
    const TemplateQuery = new QueryBuilder(Template.find(), query).filter().paginate().sort().search(['title'])

    const [templates, pagination] = await Promise.all([
        TemplateQuery.modelQuery.lean(),
        TemplateQuery.getPaginationInfo(),
    ]);

    return { data: templates, pagination };
};

const updateTemplateToDB = async (id: string, data: ITemplate) => {
    const isExist = await Template.findById(id);
    if (!isExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Template not found');
    }

    if(data.image && isExist.image && data.image !== isExist.image){
        unlinkFile(isExist.image)
    }
    const result = await Template.findOneAndUpdate({ _id: id }, data, { new: true });
    return result;
};

const deleteTemplateFromDB = async (id: string) => {
    const isExist = await Template.findById(id);
    if (!isExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Template not found');
    }
    unlinkFile(isExist.image)
    const result = await Template.findByIdAndDelete(id);
    return result;
};


const getSingleTemplateFromDB = async (id: string) => {
    const result = await Template.findById(id);
    return result;
};

export const TemplateService = {
    createTemplateIntoDB,
    getAllTemplateFromDB,
    updateTemplateToDB,
    deleteTemplateFromDB,
    getSingleTemplateFromDB
};