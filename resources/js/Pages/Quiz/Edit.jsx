import Layout from "@/Layouts/Layout";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { MinusCircle } from "@phosphor-icons/react";

const Edit = ({ auth, quiz }) => {
    const { data, setData, put, errors, processing } = useForm({
        user_id: quiz.user_id,
        title: quiz.title,
        questions: quiz.questions.map((question) => ({
            ...question,
            answers: question.answers.map((answer) => ({
                ...answer,
                is_correct: !!answer.is_correct,
            })),
        })),
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

    const updateQuiz = (e) => {
        e.preventDefault();
        put(route("quiz.update", quiz.slug));
    };

    return (
        <Layout
            auth={auth.user}
            header={`Edit ${quiz.title}`}
            title={`Edit ${quiz.title}`}
        >
            <div>
                <form onSubmit={updateQuiz} className="space-y-6">
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

                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="space-y-6">
                        {data.questions.map((question, qIndex) => (
                            <div key={qIndex}>
                                <InputLabel
                                    htmlFor={`question_${qIndex}`}
                                    value={`Question ${qIndex + 1}`}
                                />

                                <TextInput
                                    id={`question_${qIndex}`}
                                    placeholder="Question 1"
                                    className="mt-1 block w-full"
                                    value={question.content}
                                    onChange={(e) =>
                                        handleQuestionChange(e, qIndex)
                                    }
                                    required
                                    autoComplete={`question_${qIndex}`}
                                />

                                <InputError
                                    message={
                                        errors[`questions.${qIndex}.content`]
                                    }
                                    className="mt-2"
                                />

                                {question.answers.map((answer, aIndex) => (
                                    <div
                                        key={aIndex}
                                        className="flex items-center space-x-2"
                                    >
                                        <input
                                            type="radio"
                                            id={`correct_answer_${qIndex}`}
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
                                            placeholder="Answer 1"
                                            className="mt-1 block w-full"
                                            value={answer.content}
                                            onChange={(e) =>
                                                handleAnswerChange(
                                                    e,
                                                    qIndex,
                                                    aIndex
                                                )
                                            }
                                            required
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
                                            <MinusCircle
                                                size={32}
                                                color="red"
                                            />
                                        </button>

                                        <InputError
                                            message={
                                                errors[
                                                    `questions.${qIndex}.answers.${aIndex}.content`
                                                ]
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddAnswer(qIndex)}
                                    className="bg-blue-700 py-2 px-4 rounded-md mt-2"
                                >
                                    Add Answer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveQuestion(qIndex)}
                                    className="bg-red-700 py-2 px-4 rounded-md mt-2 ml-2"
                                >
                                    Remove Question
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddQuestion}
                            className="bg-green-700 py-2 px-4 rounded-md"
                        >
                            Add Question
                        </button>
                    </div>

                    <PrimaryButton disabled={processing}>
                        Save
                    </PrimaryButton>
                </form>
            </div>
        </Layout>
    );
};

export default Edit;
