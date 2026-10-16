import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 px-4 sm:px-6 lg:px-8 border-b border-[#ded6c5]/60 bg-[#fbf9f4]/80 text-xs font-serif ${className}`}
    >
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 text-[#78716c]">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-[#57534e] hover:text-[#8c6708] transition-colors"
          title="Return to Sovereign Home"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Home</span>
        </Link>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.path || item.name}>
              <ChevronRight className="w-3 h-3 text-[#b8860b]/60 shrink-0" />
              {isLast ? (
                <span
                  className="font-bold text-[#1c1917] truncate max-w-[260px] sm:max-w-md"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-[#8c6708] transition-colors text-[#57534e] truncate max-w-[180px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
