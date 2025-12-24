import { Card, CardContent, Typography, Box, useTheme, alpha } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryPieChartProps {
    categories: Record<string, number>;
}

const categoryLabels: Record<string, string> = {
    product_praise: 'Məhsul Təriflər',
    product_complaint: 'Məhsul Şikayət',
    service_praise: 'Xidmət Təriflər',
    service_complaint: 'Xidmət Şikayət',
    staff_praise: 'İşçi Təriflər',
    staff_complaint: 'İşçi Şikayət',
    pricing_feedback: 'Qiymət Rəyi',
    facility_complaint: 'İmkan Şikayət',
    facility_praise: 'İmkan Təriflər',
    technical_issue: 'Texniki',
    suggestion: 'Təklif',
    inquiry: 'Sual',
    general_feedback: 'Ümumi',
    'Məhsul': 'Məhsul',
    'Xidmət': 'Xidmət',
    'Qiymət': 'Qiymət',
    'Təmizlik': 'Təmizlik',
    'Digər': 'Digər',
};

// Default mock data for demo
const mockCategories: Record<string, number> = {
    'Məhsul Keyfiyyəti': 42,
    'Müştəri Xidməti': 35,
    'Qiymət Siyasəti': 22,
    'Mağaza Təmizliyi': 18,
    'Kassir Xidməti': 15,
    'Digər': 12,
};

const COLORS = [
    '#4CAF50', '#2196F3', '#FF9800', '#F44336',
    '#9C27B0', '#00BCD4', '#FFEB3B', '#795548',
    '#E91E63', '#3F51B5', '#009688', '#FF5722'
];

export default function CategoryPieChart({ categories = {} }: CategoryPieChartProps) {
    const theme = useTheme();

    // Use mock data if categories is empty or falsy
    const categoryData = categories && Object.keys(categories).length > 0 ? categories : mockCategories;

    const data = Object.entries(categoryData).map(([key, value]) => ({
        name: categoryLabels[key] || key,
        value,
    }));

    return (
        <Card sx={{
            height: '100%',
            background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.03)}, ${alpha(theme.palette.background.paper, 1)})`,
        }}>
            <CardContent>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                    🥧 Kateqoriya Paylanması
                </Typography>
                <Box sx={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                                animationBegin={0}
                                animationDuration={1000}
                            >
                                {data.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                        stroke={theme.palette.background.paper}
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => [`${value} rəy`, '']}
                                contentStyle={{
                                    backgroundColor: theme.palette.background.paper,
                                    border: 'none',
                                    borderRadius: 8,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                }}
                            />
                            <Legend
                                layout="vertical"
                                align="right"
                                verticalAlign="middle"
                                wrapperStyle={{ fontSize: 11, paddingLeft: 10 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
}
