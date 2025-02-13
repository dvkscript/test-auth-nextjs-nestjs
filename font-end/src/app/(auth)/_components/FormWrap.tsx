"use client"
import { Form } from "@/components/ui/form";
import React from "react"
import { FieldValues, UseFormReturn } from "react-hook-form";

type FormWrapProps<T extends FieldValues> =  UseFormReturn<T> & {
    children: React.ReactNode;
    onSubmit: (data: T) => void;
}

const FormWrap = <T extends FieldValues,>({
    children,
    onSubmit,
    ...props
}: FormWrapProps<T>) => {
    return (
        <>
            <Form {...props}>
                <form 
                    onSubmit={props.handleSubmit(onSubmit)} 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[500px] w-full bg-default rounded-lg p-8 flex flex-col gap-2 animate-auth-intro"
                >
                    {children}
                </form>
            </Form>
        </>
    );
};

export default FormWrap;