import { USER_ROLES } from "../../../enums/user";
import { Assessment } from "../assessment/assessment.model";
import { Subscription } from "../subscription/subscription.model";
import { Template } from "../template/template.model";
import { User } from "../user/user.model";

const getAnalatycsDataFromDB = async (year:string) => {
    const totalUsers = await User.countDocuments({role:{$in:[USER_ROLES.CANDIDATE,USER_ROLES.EMPLOYEE]}});
    const totalEarning = (await Subscription.aggregate([{$group:{_id:null,totalEarning:{$sum:"$price"}}}])).reduce((acc,curr) => acc + curr.totalEarning,0);
    const totalAssessment = await Assessment.countDocuments({isPaid:true});
    const totalSubscription = await Subscription.countDocuments({status:"active"});
    const totalTemplates = await Template.countDocuments({});

    const summury = {totalUsers,totalEarning,totalAssessment,totalSubscription,totalTemplates};


    const currentYearStartDate = year ? new Date(`${year}-01-01`) : new Date(new Date().setMonth(new Date().getMonth() - 1));
    const currentYearEndDate = year ? new Date(`${year}-12-31`) : new Date(new Date().setMonth(new Date().getMonth() + 1));

    const candidates = await User.aggregate([
        {$match:{createdAt:{$gte:currentYearStartDate,$lte:currentYearEndDate},role:USER_ROLES.CANDIDATE}},
        {$group:{
            _id:{$month:"$createdAt"},
            totalUsers:{$sum:1}
        }}
    ]);
    

    const employees = await User.aggregate([
        {$match:{createdAt:{$gte:currentYearStartDate,$lte:currentYearEndDate},role:USER_ROLES.EMPLOYEE}},
        {$group:{
            _id:{$month:"$createdAt"},
            totalUsers:{$sum:1}
        }}
    ]);

    


    const earning = await Subscription.aggregate([
        {$match:{createdAt:{$gte:currentYearStartDate,$lte:currentYearEndDate}}},
        {$group:{
            _id:{$month:"$createdAt"},
            totalEarning:{$sum:"$price"}
        }}
    ]);

    

    const allMonths = {
        1:"Jan",2:"Feb",3:"Mar",4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct",11:"Nov",12:"Dec"
    }

    const users = []
    const earningsData = []

    for(const month in allMonths){
   
        
        const candidate = candidates.find((item) => item._id.toString() === month);
        const employee = employees.find((item) => item._id.toString() === month);
        const earnings = earning.find((item) => item._id.toString() === month);

        users.push({
            month:allMonths[Number(month) as keyof typeof allMonths],
            candidates:candidate ? candidate.totalUsers : 0,
            employees:employee ? employee.totalUsers : 0
        })

        earningsData.push({
            month:allMonths[Number(month) as keyof typeof allMonths],
            totalEarning:earnings ? earnings.totalEarning : 0
        })

    }

    

    return {summury,users,earningsData};
    

};



export const DashboardService = {
    getAnalatycsDataFromDB
}