import { motion } from "framer-motion";

interface SubmitProps {
  disabled: boolean;
  isSubmitting: boolean;
  icon: React.ReactNode;
}

export function Submit({  disabled, isSubmitting, icon }: SubmitProps) {
  return (
    <button
      type="submit"
      disabled={disabled || isSubmitting}
      className="p-3 text-primary text-lg shadow-sm rounded-md bg-primary-bg hover:bg-secondary-bg"
    >
      <div className="relative">
        <span className={isSubmitting ? "invisible" : ""}>Submit</span>
        {isSubmitting && (
          <motion.div
            initial={{
              opacity: 0,
              left: 0,
              translateX: 0,
              translateY: "-50%",
            }}
            animate={{
              opacity: 1,
              left: "100%",
              translateX: "-100%",
            }}
            transition={{
              repeat: Infinity,
              duration: 1,
            }}
            className="absolute top-[50%]"
          >
            {icon}
          </motion.div>
        )}
      </div>
    </button>
  );
}
