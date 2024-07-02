import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Layout from "@/Layouts/Layout";
import { useForm } from "@inertiajs/react";
import { MinusCircle } from "@phosphor-icons/react";

const Create = ({ auth }) => {
    const { data, setData, post, errors, processing } = useForm({
        user_id: auth.user.id,
        title: "",
        questions: [
            {
                content: "",
                answers: [{ content: "", is_correct: false }],
            },
        ],
    });

    const handleQuestionChange = (e, index) => {
        const questions = [...data.questions];
        questions[index].content = e.target.value;
        setData("questions", questions);
    };

    const handleAnswerChange = (e, qIndex, aIndex) => {
        const questions = [...data.questions];
        questions[qIndex].answers[aIndex].content = e.target.value;
        setData("questions", questions);
    };

    const handleIsCorrectChange = (e, qIndex, aIndex) => {
        const questions = [...data.questions];
        questions[qIndex].answers.forEach((answer, idx) => {
            questions[qIndex].answers[idx].is_correct = false;
        });
        questions[qIndex].answers[aIndex].is_correct = e.target.checked;
        setData("questions", questions);
    };

    const handleAddQuestion = () => {
        setData("questions", [
            ...data.questions,
            { content: "", answers: [{ content: "", is_correct: false }] },
        ]);
    };

    const handleAddAnswer = (qIndex) => {
        const questions = [...data.questions];
        questions[qIndex].answers.push({ content: "", is_correct: false });
        setData("questions", questions);
    };

    const handleRemoveQuestion = (qIndex) => {
        const questions = data.questions.filter((_, index) => index !== qIndex);
        setData("questions", questions);
    };

    const handleRemoveAnswer = (qIndex, aIndex) => {
        const questions = [...data.questions];
        questions[qIndex].answers = questions[qIndex].answers.filter(
            (_, index) => index !== aIndex
        );
        setData("questions", questions);
    };

    const createQuiz = (e) => {
        e.preventDefault();
        post(route("quiz.store"));
    };

    return (
        <Layout auth={auth.user} header="Create Quiz" title="Create Quiz">
            <form onSubmit={createQuiz} className="space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        placeholder="Title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        isFocused
                        required
                        autoComplete="title"
                    />

                    <InputError className="mt-2" message={errors.title} />
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        {data.questions.map((question, qIndex) => (
                            <div key={qIndex}>
                                <InputLabel
                                    htmlFor={`content_${qIndex}`}
                                    value={`Question ${qIndex + 1}`}
                                />

                                <TextInput
                                    id={`content_${qIndex}`}
                                    placeholder={`question number ${
                                        qIndex + 1
                                    }`}
                                    className="mt-1 block w-full"
                                    value={question.content}
                                    onChange={(e) =>
                                        handleQuestionChange(e, qIndex)
                                    }
                                    autoComplete={`content_${qIndex}`}
                                />

                                <InputError
                                    className="mt-2"
                                    message={
                                        errors[`questions.${qIndex}.content`]
                                    }
                                />

                                <div className="space-y-2">
                                    {question.answers.map((answer, aIndex) => (
                                        <div
                                            key={aIndex}
                                            className="flex items-center space-x-2"
                                        >
                                            <input
                                                type="radio"
                                                id={`answer_${qIndex}_${aIndex}`}
                                                name={`correct_answer_${qIndex}`}
                                                className="radio"
                                                checked={answer.is_correct}
                                                onChange={(e) =>
                                                    handleIsCorrectChange(
                                                        e,
                                                        qIndex,
                                                        aIndex
                                                    )
                                                }
                                            />

                                            <TextInput
                                                id={`answer_${qIndex}_${aIndex}`}
                                                placeholder={`answer ${
                                                    aIndex + 1
                                                }`}
                                                className="mt-1 block w-full"
                                                value={answer.content}
                                                onChange={(e) =>
                                                    handleAnswerChange(
                                                        e,
                                                        qIndex,
                                                        aIndex
                                                    )
                                                }
                                                autoComplete={`answer_${qIndex}_${aIndex}`}
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleRemoveAnswer(
                                                        qIndex,
                                                        aIndex
                                                    )
                                                }
                                            >
                                                <MinusCircle size={32} color="red" />
                                            </button>

                                            <InputError
                                                className="mt-2"
                                                message={
                                                    errors[
                                                        `questions.${qIndex}.answers.${aIndex}.content`
                                                    ]
                                                }
                                            />
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        className="bg-blue-700 py-2 px-4 rounded-md"
                                        onClick={() => handleAddAnswer(qIndex)}
                                    >
                                        Add Answer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleRemoveQuestion(qIndex)
                                        }
                                        className="bg-red-700 py-2 px-4 rounded-md mt-2 ml-2"
                                    >
                                        Remove Question
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="bg-green-700 py-2 px-4 rounded-md"
                        onClick={handleAddQuestion}
                    >
                        Add Question
                    </button>
                </div>

                <PrimaryButton disabled={processing}>Create</PrimaryButton>
            </form>
        </Layout>
    );
};

export default Create;
