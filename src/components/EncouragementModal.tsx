import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomEncouragement } from '../data/encouragements';

interface Props {
  show: boolean;
  completedSessions: number;
  onDismiss: () => void;
  autoCloseMs?: number;
}

export default function EncouragementModal({
  show,
  completedSessions,
  onDismiss,
  autoCloseMs = 4000,
}: Props) {
  const [encouragement, setEncouragement] = useState('');

  useEffect(() => {
    if (show) {
      setEncouragement(getRandomEncouragement());
    }
  }, [show, completedSessions]);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onDismiss, autoCloseMs);
    return () => clearTimeout(timer);
  }, [show, onDismiss, autoCloseMs]);

  const handleDismiss = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center
            bg-black/30 dark:bg-black/50 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl
              px-10 py-12 max-w-sm w-[90%] text-center
              border border-gray-100 dark:border-gray-700"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
              className="text-5xl mb-5"
            >
              🌟
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2"
            >
              你已经完成一个阶段！
            </motion.h2>

            {/* Session count */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-gray-400 dark:text-gray-500 mb-5"
            >
              当前完成第 {completedSessions} 轮
            </motion.p>

            {/* Encouragement */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8 italic"
            >
              「{encouragement}」
            </motion.p>

            {/* Dismiss button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={handleDismiss}
              className="px-8 py-2.5 rounded-2xl bg-green-400 hover:bg-green-500
                text-white text-sm font-medium
                transition-all duration-200 active:scale-95 shadow-lg shadow-green-400/20"
            >
              立即休息
            </motion.button>

            {/* Auto-dismiss hint */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-gray-300 dark:text-gray-600 mt-4"
            >
              {Math.ceil(autoCloseMs / 1000)} 秒后自动进入休息
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
