import React from 'react';
import { Input } from '../Input';
import { Button } from '../Button';
import useAddTodo from '../../hooks/todo/useAddTodo';
import { Loading } from '../Loading';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TodoFormData } from '../../types';

export const AddTodoForm = () => {
    //TODO: Use redux to store and get this user data
    const userId = 'user1';
    const { handleAddTodo, loading } = useAddTodo(userId);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TodoFormData>();

    const onSubmit: SubmitHandler<TodoFormData> = (data) => {
        handleAddTodo(data.inputTodo);
        reset();
    };

    return (
        <React.Fragment>
            {loading && <Loading />}
            <form data-testid="addTodoForm" onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name="inputTodo"
                    type="text"
                    label={'Add a todo'}
                    register={register}
                    rules={{ required: 'required' }}
                    error={errors.inputTodo?.message}
                />
                <Button buttonType="Primary" onClick={() => {}}>
                    Add to list
                </Button>
            </form>
        </React.Fragment>
    );
};
