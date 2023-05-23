import { getJwtToken } from "../helpers";
import { CreateSessionRequest } from "../interface/Booking";
import { Car, CreateCarRequest } from "../interface/Car";
import { LoginResponse } from "../interface/LoginResponse.interface";
import { WrapperApiResponse } from "../interface/WrapperApiResponse.interface";
import { Zone } from "../interface/Zone";
import { globalAPi } from "./api";
export const registerCustomer = async (
	request: RegisterCustomerRequest
): Promise<WrapperApiResponse<LoginResponse>> => {
	try {
		const resp = await globalAPi.post("/customer", request);
		return { isSuccess: true, data: resp.data, statusCode: resp.status };
	} catch (error: any) {
		const statusCode = error.response.status;
		console.log(error.response.data)
		const errorMessage = error.response.data.messages[0];
		return {
			isSuccess: false,
			statusCode: statusCode,
			error: errorMessage,
		};
	}
};

export const getAllZones = async (): Promise<WrapperApiResponse<Array<Zone>>> => {
	try {
		const resp = await globalAPi.get("/zone");
		return { isSuccess: true, data: resp.data, statusCode: resp.status };
	} catch (error: any) {
		console.log(error.response.data)

		const statusCode = error.response.status;
		return {
			isSuccess: false,
			statusCode: statusCode,
			error: "Something went wrong",
		};
	}
};

export const getCustomerCars = async (): Promise<WrapperApiResponse<Array<Car>>> => {
	try {
		const token = await getJwtToken();
		console.log("🚀 ~ file: customer.ts:42 ~ getCustomerCars ~ token:", token)
		if(!token) throw new Error("Token not found")
		const resp = await globalAPi.get("/car",{headers:{Authorization:`Bearer ${token}`}});
		return { isSuccess: true, data: resp.data, statusCode: resp.status };
	} catch (error: any) {
		const statusCode = error.response.status;
		return {
			isSuccess: false,
			statusCode: statusCode,
			error: "Something went wrong",
		};
	}
}

export const registerNewCarr = async (request: CreateCarRequest): Promise<WrapperApiResponse<Array<Car>>> => {
	try {
		const token = await getJwtToken();
		if(!token) throw new Error("Token not found")
		const resp = await globalAPi.post("/car",request,{headers:{Authorization:`Bearer ${token}`}});
		return { isSuccess: true, data: resp.data, statusCode: resp.status };
	} catch (error: any) {
		console.log(error.response.data)
		const statusCode = error.response.status;
		const errorMessage  = statusCode <500 ? error.response.data.messages[0] : "Something went wrong"
		return {
			isSuccess: false,
			statusCode: statusCode,
			error: errorMessage,
		};
	}
}
export const createBookingSession = async(request:CreateSessionRequest) :Promise<WrapperApiResponse<number>>=>{
	try {
		const token = await getJwtToken();
		if(!token) throw new Error("Token not found")
		const resp = await globalAPi.post("/booking",request,{headers:{Authorization:`Bearer ${token}`}});
		return { isSuccess: true, data: resp.data, statusCode: resp.status };
	} catch (error: any) {
		console.log(error.response)
		const statusCode = error.response.status;
		const errorMessage  = statusCode <500 ? error.response.data.messages[0] : "Something went wrong"
		return {
			isSuccess: false,
			statusCode: statusCode,
			error: errorMessage,
		};
	}
}