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
		const errorMessage = statusCode === 400 ? "Email already exists" : "Registration failed";
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
		const statusCode = error.response.status;
		return {
			isSuccess: false,
			statusCode: statusCode,
			error: "Something went wrong",
		};
	}
};
