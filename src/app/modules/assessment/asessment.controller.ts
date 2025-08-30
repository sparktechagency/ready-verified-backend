import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { IAssessment } from "./assessment.interface";
import { AssessmentService } from "./assessment.service";
import sendResponse from "../../../shared/sendResponse";
import { getSingleFilePath } from "../../../shared/getFilePath";

const createAssessment = catchAsync(async (req:Request,res:Response)=>{
    const data = req.body
    const resume_url = getSingleFilePath(req.files,'doc')
    const body:IAssessment = {
        ...data,
        personal_information:JSON.parse(data.personal_information),
        professional_information:JSON.parse(data.professional_information),
        other_information:JSON.parse(data.other_information),
        qna:JSON.parse(data.qna),
        user:(req.user as any)!.id,
    }

    const result = await AssessmentService.createAssessmentToDB({
        ...body,
        professional_information:{
            ...body.professional_information,
            resume_url:resume_url!
        }
    })
    sendResponse(res,{
        statusCode:200,
        message:"Assessment created successfully",
        data:result,
        success:true
    })
})

const getAllAssessments = catchAsync(async (req:Request,res:Response)=>{
    const result = await AssessmentService.getAllAssessmentFromDB(req.query,req.user!)
    sendResponse(res,{
        statusCode:200,
        message:"Assessments fetched successfully",
        data:result.assessments,
        success:true,
        pagination:result.paginaion
    })
})

const updateAssessment = catchAsync(async (req:Request,res:Response)=>{
    const data = req.body
    if(data.personal_information){
        req.body.personal_information = JSON.parse(data.personal_information)
    }
    if(data.professional_information){
        req.body.professional_information = JSON.parse(data.professional_information)
    }
    if(data.other_information){
        req.body.other_information = JSON.parse(data.other_information)
    }
    if(data.qna){
        req.body.qna = JSON.parse(data.qna)
    }
    const resume_url = getSingleFilePath(req.files,'doc')
    if(resume_url){
        req.body.professional_information.resume_url = resume_url
    }
    const result = await AssessmentService.updateAssessmentToDB(req.params.id,req.body)
    sendResponse(res,{
        statusCode:200,
        message:"Assessment updated successfully",
        data:result,
        success:true
    })
})

const deleteAssessment = catchAsync(async (req:Request,res:Response)=>{
    const result = await AssessmentService.deleteAssessmentFromDB(req.params.id)
    sendResponse(res,{
        statusCode:200,
        message:"Assessment deleted successfully",
        data:result,
        success:true
    })
})

const changeStatus = catchAsync(async (req:Request,res:Response)=>{
    const result = await AssessmentService.changeStatusIntoDB(req.params.id,req.body.status);
    sendResponse(res,{
        statusCode:200,
        message:"Status changed successfully",
        data:result,
        success:true
    })
})

const getAssessment = catchAsync(async (req:Request,res:Response)=>{
    const result = await AssessmentService.getSingleAssessmentFromDB(req.params.id,req.user!)
    sendResponse(res,{
        statusCode:200,
        message:"Assessment fetched successfully",
        data:result,
        success:true
    })
})
export const AssessmentController = {
    createAssessment,
    getAllAssessments,
    updateAssessment,
    deleteAssessment,
    changeStatus,
    getAssessment
}