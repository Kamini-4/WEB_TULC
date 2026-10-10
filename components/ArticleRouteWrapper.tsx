import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleByIdOrSlug } from '../src/lib/articles';
import { ArticleView } from './ArticleView';

export const ArticleRouteWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const article = slug ? getArticleByIdOrSlug(slug) : undefined;

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-2xl font-serif-prestige font-bold text-white">
          Executive Briefing Not Found
        </h1>
        <p className="text-sm text-[#9aa1b2] max-w-md">
          The requested dispatch identifier could not be verified in the institutional registry.
        </p>
        <button
          onClick={() => navigate('/library')}
          className="px-6 py-2.5 bg-[#b8860b] text-black font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer"
        >
          Return to Library
        </button>
      </div>
    );
  }

  return (
    <ArticleView
      article={article}
      onClose={() => navigate('/library')}
    />
  );
};
