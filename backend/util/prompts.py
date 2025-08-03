from util.constants import DEEP_DIVES_GENERATION_PROMPT, USER_QUERY_SQL_GENERATION_PROMPT, QUICK_INSIGHT_FORMAT_PROMPT, QUICK_INSIGHT_PROMPT, \
    QUICK_INSIGHTS_FORMAT_PROMPT


def get_sql_generation_prompt_deep_dive(schema):
    return DEEP_DIVES_GENERATION_PROMPT.substitute(schema=schema)


def get_sql_generation_prompt(schema, user_query):
    return USER_QUERY_SQL_GENERATION_PROMPT.substitute(schema=schema, user_query=user_query)


def get_formatted_quick_insight(quick_insight_template, quick_insight_data):
    return QUICK_INSIGHT_FORMAT_PROMPT.substitute(quick_insight_template=quick_insight_template,
                                                  quick_insight_data=quick_insight_data)


def get_quick_insight_sql_generation_prompt(schema):
    return QUICK_INSIGHT_PROMPT.substitute(schema=schema)


def get_formatted_quick_insight_prompt(quick_insight_template, quick_insight_data):
    return QUICK_INSIGHTS_FORMAT_PROMPT.substitute(quick_insight_template=quick_insight_template,
                                                  quick_insight_data=quick_insight_data)
