import { createContext, useContext, useState, type ReactNode } from 'react';

interface DateRangeContextType {
    startDate: string;
    endDate: string;
    isLoading: boolean;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    setIsLoading: (loading: boolean) => void;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(undefined);

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
    const [startDate, setStartDate] = useState(() => {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <DateRangeContext.Provider value={{ startDate, endDate, isLoading, setStartDate, setEndDate, setIsLoading }}>
            {children}
        </DateRangeContext.Provider>
    );
};

export const useDateRange = () => {
    const context = useContext(DateRangeContext);
    if (!context) {
        throw new Error('useDateRange must be used within a DateRangeProvider');
    }
    return context;
};
