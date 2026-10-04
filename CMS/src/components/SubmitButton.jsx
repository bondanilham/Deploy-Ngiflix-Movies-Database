export default function SubmitButton({ text }) {
    return (
        <button 
            type="submit"
            className="w-full bg-[#ffa31a] hover:bg-orange-500 text-black font-bold py-3 rounded-xl transition-colors disabled:bg-gray-500 cursor-pointer text-lg mt-4"
        >
            {text}
        </button>
    )
}