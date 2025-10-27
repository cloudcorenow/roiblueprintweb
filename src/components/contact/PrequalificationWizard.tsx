import React from "react";
import { ArrowLeft, CheckCircle, X } from "lucide-react";
import { PrequalificationQuestion } from "../../types/contact";

interface PrequalificationWizardProps {
  questions: PrequalificationQuestion[];
  onQualified: () => void;
  onDisqualified: (message: string) => void;
  onExit: () => void;
}

const PrequalificationWizard: React.FC<PrequalificationWizardProps> = ({
  questions,
  onQualified,
  onDisqualified,
  onExit,
}) => {
  const [idx, setIdx] = React.useState(0);
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  const total = questions.length;
  const current = questions[idx];
  const progress = ((idx + 1) / total) * 100;

  React.useEffect(() => {
    headingRef.current?.focus();
  }, [idx]);

  const handleAnswer = (answer: boolean) => {
    if (answer !== current.qualifyingResponse) {
      onDisqualified(current.nonQualifyingMessage);
      return;
    }

    if (idx < total - 1) {
      setIdx((n) => n + 1);
    } else {
      onQualified();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-primary-600 mb-1">
            Question {idx + 1} of {total}
          </div>
          <div className="text-xs text-neutral-500">
            {total - idx - 1} questions remaining
          </div>
        </div>
        <button
          onClick={onExit}
          className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-700 transition-all duration-300 flex items-center justify-center"
          aria-label="Go back to options"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-neutral-600">Progress</span>
          <span className="text-xs font-bold text-neutral-800">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary-400 via-primary-500 to-success-500 h-2 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-50 rounded-2xl p-6">
        <h4
          ref={headingRef}
          tabIndex={-1}
          className="text-lg font-bold text-neutral-800 mb-6 leading-relaxed"
        >
          {current.question}
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className="group p-4 border-2 border-success-200 rounded-xl hover:border-success-400 hover:bg-success-50 transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-success-500 to-success-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold text-success-700">Yes</span>
          </button>

          <button
            onClick={() => handleAnswer(false)}
            className="group p-4 border-2 border-neutral-200 rounded-xl hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300 text-center"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-neutral-500 to-neutral-600 text-white rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <X className="w-6 h-6" />
            </div>
            <span className="text-lg font-bold text-neutral-700">No</span>
          </button>
        </div>
      </div>

      {idx > 0 && (
        <div className="flex justify-start">
          <button
            onClick={() => setIdx((n) => n - 1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
        </div>
      )}
    </div>
  );
};

export default PrequalificationWizard;
