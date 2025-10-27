import React from "react";

const CalComEmbed: React.FC = () => {
  return (
    <div className="w-full">
      <div
        className="bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden shadow-lg"
        style={{ height: "600px" }}
      >
        <iframe
          src="https://cal.com/cloudcore/30min"
          width="100%"
          height="100%"
          frameBorder={0}
          loading="lazy"
          style={{ border: "none" }}
          title="Schedule a 30-minute consultation"
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-neutral-600 mb-3">Having trouble with the calendar?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://cal.com/cloudcore/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-700 text-sm underline font-medium"
          >
            Open in New Window
          </a>
          <span className="text-neutral-400 text-sm hidden sm:inline">or</span>
          <a
            href="mailto:info@roiblueprint.com?subject=Consultation Request"
            className="text-primary-600 hover:text-primary-700 text-sm underline font-medium"
          >
            Email Us Instead
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalComEmbed;
