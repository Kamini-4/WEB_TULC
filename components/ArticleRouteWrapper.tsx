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
      <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] flex flex-col items-center justify-center p-6 text-center space-y-4 font-serif">
        <h1 className="text-2xl font-bold text-[#1c1917] font-serif">
          Executive Briefing Not Found
        </h1>
        <p className="text-sm text-[#57534e] max-w-md font-serif">
          The requested dispatch identifier could not be verified in the institutional registry.
        </p>
        <button
          onClick={() => navigate('/library')}
          className="px-6 py-2.5 bg-gradient-to-r from-[#b8860b] to-[#8c6708] text-white font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer shadow-sm font-serif"
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
